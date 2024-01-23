import ThemeSwitch from "@/components/shared/ThemeSwitch"

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <img className="brightness-0 dark:brightness-200" src="/assets/icons/settings.svg" alt="add" width={36} height={36} />
        <h2 className="h3-bold md:h2-bold text-left w-full dark:text-white" >Settings</h2>          
      </div>
      <div className="flex flex-col">
          <div className="flex items-center gap-20">
              <p className="text-dark-1 dark:text-light-1 text-2xl">Change theme</p>
              <ThemeSwitch />
          </div>
      </div>
    </div>
  )
}

export default Settings