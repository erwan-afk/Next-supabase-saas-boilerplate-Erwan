import type { SliderProps } from "react-aria-components";
import {
  Label,
  Slider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";

interface MySliderProps<T> extends SliderProps<T> {
  label?: string;
  thumbLabels?: string[];
  min?: number;
  max?: number;
  unite?: string;
}

export function MySlider<T extends number | number[]>({
  label,
  thumbLabels,
  min,
  max,
  unite,
  ...props
}: MySliderProps<T>) {
  return (
    <div className="flex justify-center w-full">
      <Slider {...props} className="w-full" minValue={min} maxValue={max}>
        <div className="flex text-white">
          <div className="flex flex-row justify-between w-full text-16 font-bold pb-[5px] text-grey-400 transform -translate-y-[10px]">
            <div>{min}</div>
            <div>{max}</div>
          </div>
        </div>
        <SliderTrack className="relative w-full h-7">
          {({ state }) => {
            const thumbPositions = state.values.map(
              (value, i) => state.getThumbPercent(i) * 100
            );

            const fillStyle =
              thumbPositions.length === 1
                ? {
                    left: "0%",
                    width: `${thumbPositions[0]}%`,
                  }
                : {
                    left: `${thumbPositions[0]}%`,
                    width: `${thumbPositions[1] - thumbPositions[0]}%`,
                  };

            return (
              <>
                {/* track */}
                <div className="absolute h-[10px] translate-y-[-50%] w-full rounded-full bg-blur border border-goldyellow" />
                {/* fill */}
                <div
                  className="absolute h-[10px] translate-y-[-50%] rounded-full bg-goldyellow"
                  style={fillStyle}
                />
                {state.values.map((_, i) => (
                  <div key={i} className="relative">
                    <SliderThumb
                      index={i}
                      aria-label={thumbLabels?.[i]}
                      className="h-[25px] w-[25px] top-[50%] cursor-grab rounded-full border-[10px] border-goldyellow transition bg-grey-600 outline-none focus-visible:ring-2 ring-black"
                    />
                    <SliderOutput
                      className="absolute transform -translate-x-1/2 translate-y-6 mt-2 text-white"
                      style={{ left: `${state.getThumbPercent(i) * 100}%` }}
                    >
                      <div className="flex flex-col justify-center gap-1">
                        <div className="text-24 font-bold text-grey-200 leading-3 text-center">
                          {state.getThumbValueLabel(i)}
                        </div>
                        <div className="text-16 font-bold text-grey-400">
                          {unite}
                        </div>
                      </div>
                    </SliderOutput>
                  </div>
                ))}
              </>
            );
          }}
        </SliderTrack>
      </Slider>
    </div>
  );
}
