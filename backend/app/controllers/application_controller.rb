class ApplicationController < ActionController::API
  private

  # An overkill generalization.
  # In a real application this would keep our controllers DRY though.
  def respond_with_action(action)
    if action.valid?
      result = action.perform!

      # Errors could be added during perform even though parameter validations passed
      if action.failed_perform?
        render \
          json: { success: false, errors: action.perform_phase_errors.messages.as_json },
          status: :internal_server_error
      else
        respond_with_data result
      end
    else
      render \
        json: { success: false, errors: action.errors.messages.as_json },
        status: :unprocessable_entity
    end
  end

  def respond_with_data(data, *as_json_options)
    render json: { success: true, data: data.as_json(*as_json_options) }, status: :ok
  end
end
