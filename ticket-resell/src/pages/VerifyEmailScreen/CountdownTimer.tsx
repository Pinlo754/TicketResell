import { FC, memo, useEffect, useState } from "react";

interface CountdownTimerProps {
  durationInMinutes: number;
  callbackWhenStop: () => void;
  triggerCountdown?: boolean;
}

const CountdownTimer: FC<CountdownTimerProps> = ({
  durationInMinutes,
  callbackWhenStop,
  triggerCountdown,
}) => {
  const totalSecondsInAMinute = 60;
  let totalSeconds = durationInMinutes * totalSecondsInAMinute;

  const [countdownMinute, setCountdownMinute] =
    useState<number>(durationInMinutes);
  const [countdownSecond, setCountdownSecond] = useState<number>(totalSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      const _minutesLeft = Math.floor(totalSeconds / totalSecondsInAMinute);
      const _secondsLeft = Math.floor(totalSeconds % totalSecondsInAMinute);

      if (_minutesLeft <= 0 && _secondsLeft < 0) {
        clearInterval(interval);
        callbackWhenStop?.();
        return;
      }

      setCountdownMinute(_minutesLeft);
      setCountdownSecond(_secondsLeft);

      totalSeconds--;
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [triggerCountdown]);

  return (
    <div className="text-[#EB5757] text-sm leading-4">
      {countdownMinute < 10
        ? `0${Math.floor(countdownMinute)}`
        : Math.floor(countdownMinute)}
      :{countdownSecond < 10 ? `0${countdownSecond}` : countdownSecond}
    </div>
  );
};

export default memo(CountdownTimer);
