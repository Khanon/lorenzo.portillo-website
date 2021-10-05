export class Arrays {
    static shuffle(arr: any[]): void {
        let currentIndex = arr.length;
        let randomIndex: number;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }
    }

    static empty(arr: any[]): void {
        arr.splice(0, arr.length);
    }
}
