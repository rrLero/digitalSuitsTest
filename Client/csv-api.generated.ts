import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: [],
  endpoints: (build) => ({
    csvApiControllerUploadFile: build.mutation<
      CsvApiControllerUploadFileApiResponse,
      CsvApiControllerUploadFileApiArg
    >({
      query: (queryArg) => ({
        url: `/csv-api/upload`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    csvApiControllerDownloadAllCsv: build.query<
      CsvApiControllerDownloadAllCsvApiResponse,
      CsvApiControllerDownloadAllCsvApiArg
    >({
      query: () => ({ url: `/csv-api/csv-data` }),
    }),
    csvApiControllerGetCsvDataInfo: build.query<
      CsvApiControllerGetCsvDataInfoApiResponse,
      CsvApiControllerGetCsvDataInfoApiArg
    >({
      query: () => ({ url: `/csv-api/csv-data/info` }),
    }),
  }),
});
export type CsvApiControllerUploadFileApiResponse = /** status 201  */ CsvDto[];
export type CsvApiControllerUploadFileApiArg = {
  body: {
    file: Blob;
  };
};
export type CsvApiControllerDownloadAllCsvApiResponse =
  /** status 200  */ CsvDto[];
export type CsvApiControllerDownloadAllCsvApiArg = void;
export type CsvApiControllerGetCsvDataInfoApiResponse =
  /** status 200  */ EmailDataDto;
export type CsvApiControllerGetCsvDataInfoApiArg = void;
export type CsvDto = {
  donor_id: string;
  donor_name: string;
  donor_email: string;
  donor_gender: string;
  donor_address: string;
  donation_amount: string;
};
export type EmailDataDto = {
  anonymousPerc: number;
  totalValue: number;
  totalNumber: number;
};
export const {
  useCsvApiControllerUploadFileMutation,
  useCsvApiControllerDownloadAllCsvQuery,
  useCsvApiControllerGetCsvDataInfoQuery,
} = api;
