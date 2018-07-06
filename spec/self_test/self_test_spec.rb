require 'rails_helper'

RSpec.describe 'Self_test' do 
  context 'User locates post on homepage' do 
    it 'finds a post link' do 
      visit root_path
      expect(page).to have_selector('.single-post-card')
    end
  end
end