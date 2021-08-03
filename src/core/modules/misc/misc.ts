import { Logger } from '../logger/logger';

export namespace Misc {
    export class Maths {
        static readonly MIN_DISTANCE = 0.00000001;

        static increaseValue(from: number, to: number, speed: number, completed?: () => void): number {
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
            const length = Math.sqrt(lengthPow2);
            if (length < this.MIN_DISTANCE) {
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
            if (length < this.MIN_DISTANCE) {
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

    // ---------------------------------------------------------------------------------------

    abstract class KeyValueBase<K, V> {
        protected readonly keys: K[] = [];
        protected readonly values: V[] = [];

        get(key: K): { key: K; value: V } {
            return this.search<K>(key, this.keys);
        }

        getByValue(value: V): { key: K; value: V } {
            return this.search<V>(value, this.values);
        }

        protected abstract search<T>(keyvalue: T, arrSeach: T[]): any;
    }

    export class KeyValue<K, V> extends KeyValueBase<K, V> {
        add(key: K, value: V) {
            if (this.get(key) !== undefined) {
                Logger.warn("Can't repeat key value -", key);
                return;
            }
            this.keys.push(key);
            this.values.push(value);
        }

        del(key: K): void {
            const index = this.keys.indexOf(key);
            if (index >= 0) {
                this.keys.splice(index, 1);
                this.values.splice(index, 1);
            }
        }

        protected search<T>(keyvalue: T, arrSeach: T[]): { key: K; value: V } {
            const index = arrSeach.indexOf(keyvalue);
            if (index < 0) {
                return undefined;
            } else {
                return { key: this.keys[index], value: this.values[index] };
            }
        }
    }

    // ---------------------------------------------------------------------------------------

    export class RKeyValue<K, V> extends KeyValueBase<K, V> {
        add(key: K, value: V) {
            this.keys.push(key);
            this.values.push(value);
        }

        del(key: K): void {
            for (let i = this.keys.length - 1; i >= 0; i--) {
                if (this.keys[i] === key) {
                    this.keys.splice(i, 1);
                    this.values.splice(i, 1);
                }
            }
        }

        protected search<T>(keyvalue: T, arrSeach: T[]): { key: K; value: V }[] {
            const result = [];
            for (let i = 0; i < this.keys.length; i++) {
                if (arrSeach[i] === keyvalue) {
                    result.push({ key: this.keys[i], value: this.values[i] });
                }
            }
            return result;
        }
    }
}
