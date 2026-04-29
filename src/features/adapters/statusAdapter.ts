import {Status} from "../../types/OrderStatus.ts";

export const getStatusColorRuAdapter = (status: string) => {
    switch(status) {
        case Status.InProgress: return "default";
        case Status.OnTheWay: return "processing";
        case Status.Sent: return "success";
        default: return "default";
    }
}