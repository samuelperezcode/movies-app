import type {NextRequest} from "next/server";

import {createUploadthing, type FileRouter} from "uploadthing/next";
import {UploadThingError} from "uploadthing/server";

const f = createUploadthing();

const auth = async (req: NextRequest) => {
  const user = req.cookies.get("auth-session")?.value;

  return user;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  movieCover: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
    // Set permissions and file types for this FileRoute
    .middleware(async ({req}) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {userId: user};
    })
    .onUploadComplete(async ({metadata, file}) => {
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {
        uploadedBy: metadata.userId,
        url: file.url,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
