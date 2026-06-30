export class ApiResponse<T = unknown> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;

  constructor(statusCode: number, message: string = "Success", data?: T) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}
