import locations from "@/lib/bangladesh-locations.json";

// Division, district, and upazila names from Open Admin Data
// (https://github.com/open-admin-data/bangladesh-administrative-divisions), CC-BY-4.0.

type District = {
  name: string;
  upazilas: string[];
};

type Division = {
  name: string;
  districts: District[];
};

const divisions = locations as Division[];

export function divisionNames(): readonly string[] {
  return divisions.map((division) => division.name);
}

export function districtsIn(division: string): readonly string[] {
  return (
    divisions.find((item) => item.name === division)?.districts.map((district) => district.name) ??
    []
  );
}

export function upazilasIn(division: string, district: string): readonly string[] {
  return (
    divisions
      .find((item) => item.name === division)
      ?.districts.find((item) => item.name === district)?.upazilas ?? []
  );
}
