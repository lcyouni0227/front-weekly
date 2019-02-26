export default {
    methods: {
        isRun() {
            if (this.isRunStatus) {
                return true;
            }
            this.isRunStatus = true;
            return false;
        },
        endRun() {
            this.isRunStatus = false;
        }
    }
}