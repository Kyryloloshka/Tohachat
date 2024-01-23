type LoaderProps = {
  height?: number,
}

const Loader = ({height}: LoaderProps) => {
  return (
    <div className={`flex-center w-full`}>
        <img className="brightness-0 dark:brightness-200" src="/assets/icons/loader.svg" alt="loader" width={height ? height : 24} />
    </div>
  )
}

export default Loader