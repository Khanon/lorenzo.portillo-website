let worker = new Worker('./workers/worker-timer.js');
export const WorkerTimer = {
    intervalId: 0,
    timeoutId: 0,
    callbacksInterval: {},
    callbacksTimeout: {},
    setInterval: function (cb: () => void, interval: number, context: any) {
        this.intervalId++;
        let id = this.intervalId;
        this.callbacksInterval[id] = { fn: cb, context: context };
        worker.postMessage({
            command: 'interval:start',
            interval,
            id,
        });
        return id;
    },
    setTimeout: function (cb: () => void, time: number, context: any) {
        this.timeoutId++;
        let id = this.timeoutId;
        this.callbacksTimeout[id] = { fn: cb, context: context };
        worker.postMessage({
            command: 'timeout:start',
            time,
            id,
        });
        return id;
    },
    onMessage: function (e) {
        switch (e.data.message) {
            case 'interval:tick':
                let callbackInterval = this.callbacksInterval[e.data.id];
                if (callbackInterval && callbackInterval.fn) callbackInterval.fn.apply(callbackInterval.context);
                break;
            case 'interval:cleared':
                delete this.callbacksInterval[e.data.id];
                break;
            case 'timeout:done':
                let callbackTimeout = this.callbacksTimeout[e.data.id];
                if (callbackTimeout && callbackTimeout.fn) callbackTimeout.fn.apply(callbackTimeout.context);
                worker.postMessage({
                    command: 'timeout:clear',
                    id: e.data.idd,
                });
                break;
            case 'timeout:cleared':
                delete this.callbacksTimeout[e.data.id];
                break;
        }
    },
    clearInterval: function (id) {
        worker.postMessage({ command: 'interval:clear', id: id });
    },
    clearTimeout: function (id) {
        worker.postMessage({ command: 'timeout:clear', id: id });
    },
};
worker.onmessage = WorkerTimer.onMessage.bind(WorkerTimer);
