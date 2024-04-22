import { FilterType } from "src/app/shared/base";
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
  defaultStatus?: number[];
  status: ProjectStatus[];
  regions: Region[];
  executives: [];
  departments: Department[];
  provinces: Province[];
  districts: District[];
  amountRanges: AmountRange[];
  dateRange: DateRange;
}

export interface ProjectActiveFilters {
  type?: FilterType;
  search?: string;
  filters: {
    status?: number[];
    regions?: number[];
    executives?: number[];
    departments?: number[];
    provinces?: number[];
    amountRanges?: number[];
    minDate?: Date;
    maxDate?: Date;
  };
}
