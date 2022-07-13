Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root to: 'site#index'

  namespace :api do
    resources :activities, only: %i[index show create destroy update todays_activities]
    get 'todays-activities', to: 'activities#todays_activities'
  end
end
