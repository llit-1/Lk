export interface PhoneCallResponse {
  status: string;
  status_code: number;
  check_id: string;
  call_phone: string;
  call_phone_pretty: string;
  call_phone_html: string;
}

export interface CheckCodeResponse {
    status: string;
    status_code: number;
    check_status: string;
    check_status_text: string;
}