function Slider({ value }: { value: number }) {
  return (
    <span className="flex touch-none h-6 py-2">
      <span className="size-full border rounded-full border-white overflow-hidden">
        <span
          role="slider"
          aria-valuemin={0}
          aria-valuenow={value * 100}
          aria-valuemax={100}
          tabIndex={0}
          className="block h-full bg-white"
          //   style={{ width: `${value * 100}%` }}
          style={{ width: `${value}%` }}
        />
      </span>
    </span>
  );
}

export default Slider;
