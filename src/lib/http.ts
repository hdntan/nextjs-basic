import envConfig from "@/config";
import { normalizePath } from "@/lib/utils";
import { LoginResType } from "@/schemaValidations/auth.schema";

type CustomOptions = Omit<RequestInit,'method'> & {
  baseUrl?: string | undefined;
};


const ENTITY_ERROR_STATUS = 422

type EntityErrorPayload = {
  message: string,
  errors: {
    field: string,
    message: string
  }[]
}


export class HttpError extends Error {
  status: number;
  payload: {
    message: string,
    [key: string]: any
  }

  constructor({ status, payload }: { status: number; payload?: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422
  payload: EntityErrorPayload

  constructor({status, payload }: { status: 422; payload: EntityErrorPayload}) {
    super({ status, payload });
    if(status !== ENTITY_ERROR_STATUS) {
      throw new Error("Invalid status code for EntityError")
    }
    this.status = status;
    this.payload = payload;
  }
}

class SessionToken {
  private token = "";

  get value() {
    return this.token;
  }

  set value(token: string) {
    if (typeof window === "undefined") {
      console.log("🚀 ~ sessionToken ~ setvalue ~ window:", window);

      throw new Error("Can not set token on sever side");
    }

    this.token = token;
  }
}

export const clientSessionToken = new SessionToken();

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body ? JSON.stringify(options?.body) : undefined;

  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : '',
  };

  // Neu khong truyen baseurl hoac baseurl = undefine thi lay tu envconfig
  // neu truyn vao baeUrl thi lay gia tri truyen vao, neu truyen vao '' thi dong nghia chung ta goi api den nextjs server
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API
      : options?.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  //Interceptor la noi chung ta xu ly request va response truoc khi tra ve cho phia component
  if (!res.ok) {
    if(res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(data as {
        status: 422,
        payload: EntityErrorPayload,
      });
    }
    else {
      throw new HttpError(data);
    }
  }


  //dam bao chi chay o client
  if(typeof window !== 'undefined') {
    if(['auth/login','auth/register'].some((item) => item === normalizePath(url))) {
      clientSessionToken.value = (payload as LoginResType).data?.token;
    } else if('auth/logout' === normalizePath(url)) {
      clientSessionToken.value = '';
    }
  }

  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },

  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },

  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },

  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;
