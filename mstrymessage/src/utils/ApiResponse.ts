// Standard API response structure
export class ApiResponse<T = unknown> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;

  constructor(
    statusCode: number,
    message: string = "Success",
    data: T | null = null,
  ) {
    this.statusCode = statusCode;
    this.success = statusCode >= 200 && statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

// export class ApiResponse<T = unknown> {
//   constructor(
//     public statusCode: number,
//     public message: string = "Success",
//     public data: T | null = null,
//     public success: boolean = statusCode < 400
//   ) {}
// }
