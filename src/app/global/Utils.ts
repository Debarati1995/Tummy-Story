
export default class Utils {

    /**
     * This function sorts items of an array based on a property value passed to it
     * @param array
     * @param nestedProp
     * @param sortBy
     * @param isAsc
     */
    static sortArray(array: any, nestedProp: any, sortBy: any, isAsc: boolean) {
        array.sort((a, b) => {
            let val1;
            let val2;

            val1 = a[nestedProp];
            val2 = b[nestedProp];
            const propList = sortBy.split('.');
            for (const prop of propList) {
                val1 = val1[prop];
                val2 = val2[prop];
            }

            if (val1 > val2) {
                return isAsc ? 1 : -1;
            }
            if (val1 < val2) {
                return isAsc ? -1 : 1;
            }
            return 0;
        });
    }
}
