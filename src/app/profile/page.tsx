import Nav from "@/components/Nav";
import profileJson from "@/data/profile.json";
import Image from "next/image";
import Link from "next/link";

const profileData = profileJson.data;

export default function Home() {
  return (
    <main className="flex flex-col bg-neutral-100 w-full min-h-screen">
      <div className="sticky top-0 z-10">
        <Nav />
      </div>

      <div className="max-w-screen-lg mx-auto flex flex-col items-center p-10 space-y-8">
        <h1 className="text-2xl text-neutral-900">
          {profileData.name} | {profileData.name_ja}
        </h1>
        <div className="flex flex-col lg:flex-row items-center space-x-8 space-y-8">
          <div className="mx-auto max-w-80">
            <Image
              className="mx-auto"
              src={profileData.imgPath}
              width={1200}
              height={800}
              alt="Profile Image"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-lg text-neutral-900">Profile</h2>
              <div className="flex-initial">
                <p className="text-base font-light text-neutral-800">
                  {parseMarkdownLinks(profileData.description)}
                </p>
                {/* links */}
                <div className="flex flex-col">
                  {profileData.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      className="text-base font-light text-neutral-800 underline hover:no-underline"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg text-neutral-900">Contact</h2>
              <div className="flex-initial">
                <p className="text-base font-light text-neutral-800">
                  {parseMarkdownLinks(profileData.contact)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function parseMarkdownLinks(text: string) {
  const regex = /\[([^\]]+)\]\(('([^']+)')\)/g;
  const parts = text.split(regex);

  return parts
    .map((part, index) => {
      // URLs will be at positions that are multiples of 4, starting at 3
      if ((index - 3) % 4 === 0) {
        const url = part.replace(/'/g, ""); // Remove single quotes from the URL
        const title = parts[index - 2]; // The title is two positions before the URL
        return (
          <Link key={index} href={url} className="underline hover:no-underline">
            {title}
          </Link>
        );
      }
      // Return the text part directly if it's not a URL
      if (index % 4 === 0) {
        return part;
      }
    })
    .filter(Boolean); // Filter out undefined parts
}
