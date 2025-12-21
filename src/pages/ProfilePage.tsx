import { Avatar, Input } from "@heroui/react";
import React from "react";
import { fetchProfile, type Profile } from "../api/profileApi";
import Loading from "../components/shared/Loading";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      const data = await fetchProfile();
      setLoading(false);

      setProfile(data);
    };

    fetchProfileData();
  }, []);

  if (loading || !profile) return <Loading />;

  return (
    <div className="space-y-5 w-full block">
      <div className="flex flex-col items-center gap-1">
        <Avatar size="lg" radius="md" />
        <div className="text-xl">{profile.fullName}</div>
      </div>

      <div className="space-y-3 w-full">
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="ID аккаунта"
          value={String(profile.id)}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Имя"
          value={profile.fullName}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Наличные"
          value={(+profile.cash).toLocaleString("ru-RU") + " ₽"}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Евро"
          value={(+profile.euro).toLocaleString("ru-RU") + " €"}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Репутация"
          value={"+" + profile.reputation}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Bitcoin"
          value={profile.btc + " BTC"}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Компания"
          value={profile.company}
        />
        <Input
          variant="flat"
          size="lg"
          className="w-full"
          disabled
          label="Дата регистрации"
          value={new Date(profile.createdAt).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
