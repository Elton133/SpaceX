import { getCompany } from "../../services/spacex";
import SpaceXNavbarClient from "./SpaceXNavbar.client";

export default async function SpaceXNavbar() {
  const company = await getCompany();
  return <SpaceXNavbarClient companyName={company.name} />;
}
