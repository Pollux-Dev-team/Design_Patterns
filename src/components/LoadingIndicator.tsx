import { MutatingDots } from "react-loader-spinner";

const LoadindIndicator = () => {
  return (
    <div>
      <MutatingDots
        height="100"
        width="100"
        color="#ED1C24"
        secondaryColor="#ED1C24"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadindIndicator;
