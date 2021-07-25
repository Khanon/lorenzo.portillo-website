export namespace Misc {
    export class Maths {
        static readonly MIN_DISTANCE = 0.00001;

        static increaseValue(from: number, to: number, speed: number, completed?: () => void): number {
            const complete = () => {
                if (completed) {
                    completed();
                }
                return to;
            };
            const dist = Math.abs(to - from);
            if (dist <= this.MIN_DISTANCE) {
                complete();
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
            if (dist <= this.MIN_DISTANCE) {
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
            if (lengthPow2 < this.MIN_DISTANCE) {
                return complete();
            }
            const length = Math.sqrt(lengthPow2);
            const directorNormalized = director.map((value) => value / length);
            let result = [];
            for (let i = 0; i < from.length; i++) {
                result.push(this.increaseValue(from[i], to[i], Math.abs(directorNormalized[i]) * speed));
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
            if (lengthPow2 < this.MIN_DISTANCE) {
                return complete();
            }
            const length = Math.sqrt(lengthPow2);
            const directorNormalized = director.map((value) => value / length);
            let result = [];
            for (let i = 0; i < from.length; i++) {
                result.push(this.increaseValueWithInertia(from[i], to[i], Math.abs(directorNormalized[i]) * speed, acceleration));
            }
            return result;
        }
    }
}
