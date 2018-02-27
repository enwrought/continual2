
enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
interface DemographicsInfo {
  dob: Date;
  gender?: Gender;  // TODO - fix enum with typescript
}

export function estimatedAge(info: DemographicsInfo) {
  // TODO - find somewhere to poll this info?
  return 75;
}

export function getStatsInfo() {

}