import axios from "axios";

const spaceX = axios.create({
  baseURL: "https://api.spacexdata.com/v4",
});

export const getLaunches = async () => {
  const response = await spaceX.get("/launches");
  return response.data;
};

export async function getLatestLaunch() {
  const response = await spaceX.get("/launches/latest");
  return response.data;
}

export const getCompany = async () => {
  const response = await spaceX.get("/company");
  return response.data;
};

export async function getLaunchVideos() {
  const response = await spaceX.get("/launches");
    const launches = response.data;

    const launchWithVideo = launches.find(
        (launch: any) => launch.links?.youtube_id
    );

    return launchWithVideo;
}
