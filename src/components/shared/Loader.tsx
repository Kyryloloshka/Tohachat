type LoaderProps = {
  height?: number,
}

const Loader = ({height}: LoaderProps) => {
  return (
    <div className={`flex-center w-full`}>
        <img className="inverted-svg" src="/assets/icons/loader.svg" alt="loader" width={height ? height : 24} />
    </div>
  )
}

export default Loader