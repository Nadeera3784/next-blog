export class reponseParser {
  public static setJSONResponse(data: any) {
    return JSON.stringify(data);
  }

  public static getJSONResponse(data: any) {
    return JSON.parse(data);
  }
}
