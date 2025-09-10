import About from "@/components/about";
import { getLatestLaunch } from "../../services/spacex";
import SpaceXNavbar from "@/components/navbar";
import { MissionsList } from "@/components/missions-list";
import Image from "next/image";
import { getCompany } from "../../services/spacex";

export default async function LaunchPage() {
  const launch = await getLatestLaunch();
  const company = await getCompany();

  return (
    <>
      <SpaceXNavbar />
    {/* Hero 1 */}
<div className="relative w-full h-screen">
  <Image
    src="/images/advancing.jpg"
    alt="Advancing"
    width={1920}
    height={1180}
    className="w-full md:h-auto h-full object-cover object-left"
  />

  <div className="absolute inset-0 flex flex-col justify-center items-end px-8">
<h1 className="text-2xl md:text-4xl text-white mb-4 font-['Spacex']">{company.name}</h1>
    <p className="text-lg md:text-2xl text-gray-200 max-w-3xl ">
      {company.summary}
    </p>
  </div>
</div>

{/* Hero 2 */}
<div className="relative w-full h-screen">
  <Image
    src="/images/revolution.jpg"
    alt="Revolution"
    width={1920}
    height={1180}
    className="w-full md:h-auto h-full object-cover"
  />

  <div className="absolute inset-0 flex flex-col justify-center items-start px-8">
    <h1 className="text-2xl md:text-4xl text-white mb-4 font-['Spacex']">
     REVOLUTIONIZING SPACE <br /> TECHNOLOGY
    </h1>
    <p className="text-lg md:text-2xl text-gray-200 max-w-3xl">

    </p>
  </div>
</div>


      {/* <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{launch.name}</h1>
      <p className="text-gray-600 mb-2">
        {new Date(launch.date_utc).toLocaleDateString()}
      </p>

      {launch.links.patch.large && (
        <img
          src={launch.links.patch.large}
          alt={`${launch.name} mission patch`}
          className="w-48 mb-4"
        />
      )}

      {launch.links.flickr.original?.length > 0 && (
        <img
          src={launch.links.flickr.original[0]}
          alt="Launch photo"
          className="rounded-lg shadow mb-4"
        />
      )}

      {launch.links.youtube_id && (
        <iframe
          className="w-full aspect-video rounded-lg shadow"
          src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
          title={launch.name}
          allowFullScreen
        />
      )}

      <div className="mt-6">
        <a
          href={launch.links.wikipedia}
          target="_blank"
          className="text-blue-600 underline"
        >
          Read on Wikipedia
        </a>
      </div>
    </main>
    <MissionsList limit={10}/> */}
      </>
    
  );
}
