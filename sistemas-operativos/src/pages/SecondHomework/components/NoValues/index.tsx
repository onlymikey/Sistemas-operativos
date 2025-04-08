import { Card } from "@heroui/react";

export default function NoValue({
  title,
  description,
}: {
  title: string;
  description: string;
}): JSX.Element {
  return (
    <Card className="w-full h-[20vh] flex items-center justify-center border-1 dark:border-white/20 border-black/20 p-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-neutral-400 font-light text-center">{description}</p>
    </Card>
  );
}
