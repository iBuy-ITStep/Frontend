 export type OrderStatus = "В обработке" | "В пути" | "Отправлен"

 export const Status = {
     InProgress: "В обработке",
     OnTheWay: "В пути",
     Sent: "Отправлен"
 } as const;

 // Create a type from the object values
 type Status = typeof Status[keyof typeof Status]; // "re