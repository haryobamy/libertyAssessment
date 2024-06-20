import { FaCircleCheck } from 'react-icons/fa6';
import { Else, If, Then } from 'react-if';

import { CircularProgressBar } from '../ui/circular-progress-bar';

type Props = {
  label: string;
  icon: (prop: {
    color?: string;
    width?: number;
    height?: number;
  }) => JSX.Element;
  percentage: number;
};

const GadgetCheck = ({ label, percentage, ...rest }: Props) => {
  return (
    <div className="bg-primaryLight rounded-xl px-6  py-1 flex items-center justify-center flex-col gap-4 relative">
      <div
        className={`   p-2 rounded-full absolute top-0 right-0 ${percentage < 50 ? 'bg-[#EF4444]' : 'bg-primary'}`}
      >
        <rest.icon width={15} height={15} />
      </div>
      <CircularProgressBar
        percentage={percentage}
        color={percentage < 50 ? '#EF4444' : '#755AE2'}
      >
        <div className="text-white w-[42px] h-[42px] rounded-full border-primary flex items-center justify-center">
          <If condition={percentage > 50}>
            <Then>
              <FaCircleCheck
                className={`  ${percentage < 50 ? 'text-[#EF4444]' : 'text-primary'}  text-3xl `}
              />
            </Then>
            <Else>
              <rest.icon
                color={percentage < 50 ? '#EF4444' : '#755AE2'}
                width={22}
                height={22}
              />
            </Else>
          </If>
        </div>
      </CircularProgressBar>

      <span>{label}</span>
    </div>
  );
};

export default GadgetCheck;
