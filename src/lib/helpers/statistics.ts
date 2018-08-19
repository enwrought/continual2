// TODO: Should we have types to describe entities,
// and is there a way to reuse the types

enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  NA = 'U'
}

interface DemographicsInfo {
  dob: Date;
  gender?: Gender;  // TODO - fix enum with typescript
}

export function estimatedAge(info: DemographicsInfo): number {
  // TODO - find somewhere to poll this info?
  return 75;
}

function getStatsInfo() {
  return;
}
