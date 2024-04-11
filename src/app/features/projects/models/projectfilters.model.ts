import { Department, District, ProjectStatus, Province, Region } from "src/app/shared/models";

export interface AmountRange {
  minAmount: number;
  maxAmount: number;
}

export interface DateRange {
  maxDate: Date;
  minDate: Date;
}

export interface ProjectFilters {
  status: ProjectStatus[];
  regions: Region[];
  departments: Department[];
  provinces: Province[];
  districts: District[];
  amountRange: AmountRange;
  dateRange: DateRange;
}

export interface ProjectActiveFilters {
  status?: {
    statusId: number;
    checked: boolean;
  }[];
  regions?: {
    regionId: number;
    checked: boolean;
  }[];
  department?: number;
  province?: number;
  amountRange?: number[];
  minDate?: Date;
  maxDate?: Date;
}
