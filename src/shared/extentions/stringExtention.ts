declare global {
    interface String {
        sliceIfMoreThen(max: number, end?:string): string;
    }
}

String.prototype.sliceIfMoreThen = function(maxLength: number, end?:string): string{
    if (!end) end = "...";
    return this.length > maxLength ? this.slice(0, maxLength) + end : String(this);


}