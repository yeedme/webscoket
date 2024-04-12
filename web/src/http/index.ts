import axios, { AxiosResponse, AxiosError } from "axios";

const Url = "http://127.0.0.1:3011";

interface GetOptions {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  success: (data: any) => void;
  error: (error: AxiosError) => void;
}

interface PostOptions {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  success: (data: any) => void;
  error: (error: AxiosError) => void;
}


function axiosGet(options: GetOptions) {
  axios
    .get(Url + options.url)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((res: AxiosResponse<any>) => {
      options.success(res.data);
    })
    .catch((err: AxiosError) => {
      options.error(err);
    });
}
//向后后台验证数据
export function axiosGetTemperature() {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: "/temperature",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      success(data: any) {
        resolve(data);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error(error: AxiosError<any>) {
        reject(error);
      },
    })
  })
}


function axiosPost(options: PostOptions) {
  axios
    .post(Url + options.url, options.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((res: AxiosResponse<any>) => {
      options.success(res.data);
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((err: AxiosError<any>) => {
      options.error(err);
    });
}


export function postGetTemperature(data: number|string) {
  axiosPost({
    url:'/temperatures',
    data:{
      data
    },
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    success: (responseData: any) => {
      console.log(responseData);
    },
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: (error: AxiosError<any>) => {
      console.error(error);
    }
  })

}