import { join } from "./deps.ts";
import { Timetable as TT, Day } from "./types/database.ts";

export const Constants: { [key: string]: string } = {
  EDIT_LINK: "https://github.com/mad-maids/maid.table/",
  TIMETABLE_LINK: "https://hub.maid.uz/t/",
};

export const Online = async (url: string): Promise<any> => {
  const response = await fetch(url);
  return await response.json();
};

export class Time {
  protected time: Date;
  protected uzbTime: Date;

  constructor() {
    this.time = new Date();
    this.uzbTime = new Date();
    this.uzbTime.setHours(this.time.getUTCHours() + 5);
  }

  updateTime(): void {
    this.time = new Date();
    this.uzbTime = new Date();
    this.uzbTime.setHours(this.time.getUTCHours() + 5);
  }

  getTime(): Date {
    return this.time;
  }

  getUzbTime(): Date {
    return this.uzbTime;
  }

  getTimeString(isTomorrow: boolean): string {
    switch (isTomorrow) {
      case false:
        return this.getTime().getDay().toString();
      case true:
        return (this.getTime().getDay() + 1).toString();
    }
  }

  getUzbTimeString(isTomorrow: boolean): string {
    switch (isTomorrow) {
      case false:
        return this.getUzbTime().getDay().toString();
      case true:
        return (this.getUzbTime().getDay() + 1).toString();
    }
  }
}

export class Timetable {
  protected _level: number;
  protected _module: string;
  protected _group: number;
  protected filePath: string;
  protected timetable: TT;

  constructor(course: string) {
    this._level = parseInt(course.match(/([0-9]+)([A-Z]+)([0-9]+)/)[1]);
    this._module = course.match(/([0-9]+)([A-Z]+)([0-9]+)/)[2];
    this._group = parseInt(course.match(/([0-9]+)([A-Z]+)([0-9]+)/)[3]);
    this.filePath = join(
      "timetable",
      this._level + this._module,
      this._level + this._module + this._group + ".json"
    );
    this.timetable = JSON.parse(Deno.readTextFileSync(this.filePath));
  }

  set level(level: number) {
    this._level = level;
  }

  get level(): number {
    return this._level;
  }

  set module(module: string) {
    this._module = module;
  }

  get module(): string {
    return this._module;
  }

  set group(group: number) {
    this._group = group;
  }

  get group(): number {
    return this._group;
  }

  getAllLessons(): TT {
    return this.timetable;
  }

  getDayLessons(day: string | number | Day): TT | any {
    switch (day) {
      case 0:
      case 7:
      case "Sun":
      case "Sunday":
        return this.timetable[0];
      case 1:
      case "Mon":
      case "Monday":
        return this.timetable[1];
      case 2:
      case "Tue":
      case "Tuesday":
        return this.timetable[2];
      case 3:
      case "Wed":
      case "Wednesday":
        return this.timetable[3];
      case 4:
      case "Thu":
      case "Thursday":
        return this.timetable[4];
      case 5:
      case "Fri":
      case "Friday":
        return this.timetable[5];
      case 6:
      case "Sat":
      case "Saturday":
        return this.timetable[6];
    }
  }

  getTimetableLink(): string {
    return Constants.TIMETABLE_LINK + this._level + this._module;
  }

  getTimetableEditLink(): string {
    return (
      Constants.EDIT_LINK +
      `blob/main/data/${this._level}${this._module}/${this._level}${this._module}${this._group}.json`
    );
  }
}
