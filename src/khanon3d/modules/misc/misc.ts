import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { Logger } from '../logger/logger';

export namespace Misc {
    export class Strings {
        static hash(text: string): number {
            let hash = 0;
            let chr: number;
            if (text.length === 0) {
                return hash;
            }
            for (let i: number = 0; i < text.length; i++) {
                chr = text.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0;
            }
            return hash;
        }
    }

    // ---------------------------------------------------------------------------------------

    export class Vectors {
        static vectorialProjectionToLine(vector: Vector3, line: Vector3): Vector3 {
            return line.scale(Vector3.Dot(vector, line) / Vector3.Dot(line, line));
        }

        static scalarProjectionToLine(vector: Vector3, line: Vector3): number {
            // return vector.length() * this.angleBetweenLines(vector, line);
            return this.vectorialProjectionToLine(vector, line).length();
        }

        static vectorialProjectionToPlane(vector: Vector3, planeNormal: Vector3): Vector3 {
            return vector.subtract(Misc.Vectors.vectorialProjectionToLine(vector, planeNormal));
        }

        static scalarProjectionToPlane(vector: Vector3, line: Vector3): number {
            return this.vectorialProjectionToPlane(vector, line).length();
        }

        static angleBetweenLines(lineA: Vector3, lineB: Vector3): number {
            return Math.acos(Misc.Maths.clamp(Vector3.Dot(lineA, lineB) / (lineA.length() * lineB.length()), -1, 1));
        }

        static angleXBetweenLines(lineA: Vector3, lineB: Vector3): number {
            const angleA = Math.atan2(lineA.y, lineA.z);
            const angleB = Math.atan2(lineB.y, lineB.z);
            return angleA - angleB;
        }

        static angleYBetweenLines(lineA: Vector3, lineB: Vector3): number {
            const angleA = Math.atan2(lineA.x, lineA.z);
            const angleB = Math.atan2(lineB.x, lineB.z);
            return angleA - angleB;
        }

        static angleZBetweenLines(lineA: Vector3, lineB: Vector3): number {
            const angleA = Math.atan2(lineA.x, lineA.y);
            const angleB = Math.atan2(lineB.x, lineB.y);
            return angleA - angleB;
        }
    }

    // ---------------------------------------------------------------------------------------

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

    // ---------------------------------------------------------------------------------------

    abstract class KeyValueBase<K, V> {
        protected readonly pairs: { key: K; value: V }[] = [];
        protected readonly keys: K[] = [];
        protected readonly values: V[] = [];

        abstract add(key: K, value: V): void;
        abstract del(key: K): void;
        protected abstract search<T>(keyvalue: T, arrSeach: T[]): any;

        get<T = V>(key: K): T {
            return this.search<K>(key, this.keys)?.value;
        }

        getPairs(): { key: K; value: V }[] {
            return this.pairs;
        }

        getKeys(): K[] {
            return this.keys;
        }

        getValues(): V[] {
            return this.values;
        }

        getByKey(key: K): { key: K; value: V } {
            return this.search<K>(key, this.keys);
        }

        getByValue(value: V): { key: K; value: V } {
            return this.search<V>(value, this.values);
        }
    }

    /**
     * Non repeatable Key-Value (keys are unique in the array)
     */
    export class KeyValue<K, V> extends KeyValueBase<K, V> {
        add(key: K, value: V): void {
            if (this.getByKey(key) !== undefined) {
                Logger.warn("Can't repeat key value -", key);
                return;
            }
            this.pairs.push({ key, value });
            this.keys.push(key);
            this.values.push(value);
        }

        del(key: K): void {
            const index = this.keys.indexOf(key);
            if (index >= 0) {
                this.pairs.splice(index, 1);
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

    /**
     * Repeatable Key-Value (keys can be repeated in the array)
     */
    export class RKeyValue<K, V> extends KeyValueBase<K, V> {
        add(key: K, value: V) {
            this.pairs.push({ key, value });
            this.keys.push(key);
            this.values.push(value);
        }

        del(key: K): void {
            for (let i = this.keys.length - 1; i >= 0; i--) {
                if (this.keys[i] === key) {
                    this.pairs.splice(i, 1);
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