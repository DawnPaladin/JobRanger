Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root to: 'site#index'

  namespace :api do
    resources :activities, only: %i[index show create destroy update todays_activities]
    get 'todays-activities', to: 'activities#todays_activities'
    get 'high-scores', to: 'xp#high_scores'
    get 'weekly-xp', to: 'xp#weekly_xp'
    resources :loot, only: %i[index show create destroy update]
    get 'weekly-loot', to: 'loot#weekly_loot'
    get 'total-loot-counts', to: 'loot#total_loot_counts'
  end
end
