interface HttpResponse {
  headers: { [key: string]: string };
  statusCode: number;
  cookie: string | null;
  data: any;
  success: boolean;
  message?: string;
}

export const makeHttpError = ({
  message,
  statusCode = 500,
  cookie = null,
}: {
  message: string;
  statusCode?: number;
  cookie?: string | null;
}): HttpResponse => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: statusCode,
    cookie: cookie,
    success: false,
    message,
    data: null,
  };
};

export const makeHttpSuccess = ({
  statusCode,
  message,
  data,
  cookie = null,
}: {
  statusCode: number;
  message: string;
  data: any;
  cookie?: string | null;
}): HttpResponse => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode,
    cookie,
    success: true,
    message,
    data,
  };
};
