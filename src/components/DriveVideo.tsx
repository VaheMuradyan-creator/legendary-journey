import { driveVideoEmbedUrl } from "@/lib/drive";

type DriveVideoProps = {
  src: string;
  title: string;
};

export function DriveVideo({ src, title }: DriveVideoProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-card-border bg-black">
      <iframe
        src={driveVideoEmbedUrl(src)}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
