import { Currency, Department, District, ProjectStatus, Province, Region } from "src/app/shared/models";

export interface AmountRange {
  id: number;
  minAmount?: number;
  maxAmount?: number;
  currency: Currency;
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
  amountRanges: AmountRange[];
  dateRange: DateRange;
}

export interface ProjectActiveFilters {
  search?: string;
  status?: number[];
  regions?: number[];
  departments?: number[];
  provinces?: number[];
  amountRanges?: number[];
  minDate?: Date;
  maxDate?: Date;
}
