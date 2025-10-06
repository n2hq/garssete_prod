import { GlobalEventType } from "../types"

export class GlobalEvent {
    fullName: string = ""

    constructor(
        public globalEventType: GlobalEventType
    ) {
        this.modifyName()
    }

    private getHostFullName = (userGuid: string) => {
        return 'fullname'
    }

    private modifyName = () => {
        this.fullName = this.getHostFullName(this.globalEventType.host)
    }
}