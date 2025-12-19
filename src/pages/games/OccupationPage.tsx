import { Avatar, Button } from "@heroui/react";
import React from "react";
import { useParams } from "react-router-dom";
import {
  appleTargetLocation,
  fetchBattleship,
  type Battle,
  type Company,
  type Location,
} from "../../api/gameApi";
import { AimIcon } from "../../assets/AimIcon";
import { PositionIcon } from "../../assets/PositionIcon";
import RemainingTime from "../../components/shared/RemainingTime";
import { cn } from "../../utils/classNames";

const getTitleByStep = (step: number, status?: "WIN" | "LOSE" | "DRAW") => {
  switch (step) {
    case 1:
      return "Поставь объект на поле!";
    case 2:
      return "Сделай ход!";
    case 3:
      return "Ждем остальных игроков!";
    case 4:
      return status === "WIN"
        ? "Вы победили!"
        : status === "LOSE"
        ? "Вы проиграли!"
        : "Ничья!";
    default:
      return "Ждем остальных игроков!";
  }
};

const getIconByStep = (
  step: number,
  x?: number,
  y?: number,
  targetLocations?: Location[],
  targetAims?: Location[],
  locations?: Location[],
  aims?: Location[]
) => {
  switch (step) {
    case 1:
      return <PositionIcon />;
    case 2:
      return <AimIcon />;
    case 3:
    case 4:
      if (targetAims?.find((aim) => aim.x === x && aim.y === y)) {
        return <AimIcon color="#FF383C" />;
      }

      if (
        targetLocations?.find(
          (location) => location.x === x && location.y === y
        )
      ) {
        return <PositionIcon color="#FF383C" />;
      }

      if (aims?.find((aim) => aim.x === x && aim.y === y)) {
        return <AimIcon color="#17C964" />;
      }

      if (locations?.find((location) => location.x === x && location.y === y)) {
        return <PositionIcon color="#17C964" />;
      }

      return;
    default:
      return;
  }
};

const getBackgroundSquare = (
  x: number,
  y: number,
  company: Company,
  targetCompany: Company
) => {
  const companyFoundLocation = company.aims.find(
    (aim) => aim.x === x && aim.y === y
  );
  const targetCompanyFoundLocation = targetCompany.aims.find(
    (aim) => aim.x === x && aim.y === y
  );

  if (companyFoundLocation && !targetCompanyFoundLocation) {
    return "bg-[#17C964]";
  }

  if (companyFoundLocation && targetCompanyFoundLocation) {
    return "bg-[#FDFD8A]";
  }

  if (targetCompanyFoundLocation && !companyFoundLocation) {
    return "bg-[#FF383C]";
  }

  return "bg-[#D9D9D9]";
};

const OccupationPage: React.FC = () => {
  const [step, setStep] = React.useState<number>(1);
  const [selectedPosition, setSelectedPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [battleData, setBattleData] = React.useState<Battle | null>(null);

  const id = useParams().id;

  React.useEffect(() => {
    const fetchBattleData = async () => {
      if (!id) return;

      const data = await fetchBattleship(id);

      setBattleData(data);
      setStep(data.step);
    };

    fetchBattleData();
  }, []);

  const onSelectPosition = React.useCallback(
    (x: number, y: number) => {
      if (step > 2) return;
      setSelectedPosition({ x, y });
    },
    [step]
  );

  const onApplyPosition = React.useCallback(async () => {
    if (!selectedPosition) return;

    const data = await appleTargetLocation(
      selectedPosition.x,
      selectedPosition.y
    );

    if (data.success) {
      setStep((prev) => (prev < 3 ? prev + 1 : prev));

      setSelectedPosition(null);
    }
  }, [step, selectedPosition?.x, selectedPosition?.y]);

  if (!id || !battleData) return <div>Неправильная ссылка</div>;

  return (
    <div className="space-y-3 max-w-[400px] mx-auto">
      <header className="space-y-3">
        <div className="flex gap-3 text-2xl items-center text-[#F31260]">
          <Avatar radius="lg" color="danger" /> {battleData.targetCompany.title}
        </div>
        {step < 4 && (
          <RemainingTime
            duration={battleData.duration}
            createdAt={battleData.createdAt}
          />
        )}

        <div className="text-center text-2xl">
          {getTitleByStep(step, battleData.status)}
        </div>
      </header>

      <main className="space-y-1">
        {Array.from({ length: 9 }, (_, y) => (
          <div className="flex gap-1" key={y}>
            {Array.from({ length: 9 }, (_, x) => {
              return (
                <button
                  disabled={step > 2}
                  onClick={() => onSelectPosition(x, y)}
                  className={cn(
                    getBackgroundSquare(
                      x,
                      y,
                      battleData.company,
                      battleData.targetCompany
                    ),
                    "rounded-sm disabled:opacity-80  flex-1 aspect-square"
                  )}
                  key={x}
                >
                  {step < 3
                    ? selectedPosition &&
                      selectedPosition.x === x &&
                      selectedPosition.y === y &&
                      getIconByStep(step)
                    : getIconByStep(
                        step,
                        x,
                        y,
                        battleData.targetCompany.locations,
                        battleData.targetCompany.aims,
                        battleData.company.locations,
                        battleData.company.aims
                      )}
                </button>
              );
            })}
          </div>
        ))}
        {step < 3 && (
          <Button
            disabled={!selectedPosition}
            className="w-full"
            onPress={onApplyPosition}
          >
            Применить ход
          </Button>
        )}
      </main>
    </div>
  );
};

export default OccupationPage;
