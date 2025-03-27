import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-container my-5">
      <img src="/src/assets/spinner.gif" alt="Caricamento..." style={{ width: 180 }} />
    </div>
  );
};

export default LoadingSpinner;
