export class Maths {
    static readonly MIN_VALUE = 0.00000001;

    static clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

    static randomInt(minValue: number, maxValue: number): number {
        return Math.trunc(minValue + Math.random() * (maxValue - minValue + 0.9999999));
    }

    static increaseValue(from: number, to: number, speed: number, completed?: () => void): number {
        const complete = () => {
            if (completed) {
                completed();
            }
            return to;
        };
        const dist = Math.abs(to - from);
        if (dist <= this.MIN_VALUE) {
            return complete();
        }
        if (to < from) {
            from -= speed;
            if (from < to) {
                return complete();
            }
        } else {
            from += speed;
            if (from > to) {
                return complete();
            }
        }
        return from;
    }

    static increaseValueWithInertia(from: number, to: number, speed: number, acceleration: number = 1, completed?: () => void): number {
        const complete = () => {
            if (completed) {
                completed();
            }
            return to;
        };
        const dist = Math.abs(to - from);
        if (dist <= this.MIN_VALUE) {
            return complete();
        }
        if (to < from) {
            from -= speed / (1 / (dist * acceleration));
            if (from < to) {
                return complete();
            }
        } else {
            from += speed / (1 / (dist * acceleration));
            if (from > to) {
                return complete();
            }
        }
        return from;
    }

    static increaseVector(from: number[], to: number[], speed: number, completed?: () => void): number[] {
        const complete = () => {
            if (completed) {
                completed();
            }
            return to;
        };
        const director = [];
        for (let i = 0; i < from.length; i++) {
            director.push(to[i] - from[i]);
        }
        let lengthPow2 = 0;
        director.forEach((value) => (lengthPow2 += Math.pow(value, 2)));
        const length = Math.sqrt(lengthPow2);
        if (length < this.MIN_VALUE) {
            return complete();
        }
        const directorNormalized = director.map((value) => value / length);
        let result = [];
        for (let i = 0; i < from.length; i++) {
            const resultValue = this.increaseValue(from[i], to[i], Math.abs(directorNormalized[i]) * speed);
            result.push(resultValue);
        }
        return result;
    }

    static increaseVectorWithInertia(from: number[], to: number[], speed: number, acceleration: number = 1, completed?: () => void): number[] {
        const complete = () => {
            if (completed) {
                completed();
            }
            return to;
        };
        const director = [];
        for (let i = 0; i < from.length; i++) {
            director.push(to[i] - from[i]);
        }
        let lengthPow2 = 0;
        director.forEach((value) => (lengthPow2 += Math.pow(value, 2)));
        const length = Math.sqrt(lengthPow2);
        if (length < this.MIN_VALUE) {
            return complete();
        }
        const directorNormalized = director.map((value) => value / length);
        let result = [];
        for (let i = 0; i < from.length; i++) {
            const resultValue = this.increaseValueWithInertia(from[i], to[i], Math.abs(directorNormalized[i]) * speed, acceleration);
            result.push(resultValue);
        }
        return result;
    }
}