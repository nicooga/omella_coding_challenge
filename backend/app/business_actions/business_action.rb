# An almost trivial implementation of a business action in Ruby.
#
# @abstract
class BusinessAction
  include ActiveModel::Validations

  attr_reader :perform_phase_errors

  # I would tipically accept the performer alongside the action parameters,
  # but for simplicity we don't have users in this system.
  def initialize(attributes = {})
    attributes.each do |key, value|
      public_send("#{key}=", value)
    end

    @perform_phase_errors = ActiveModel::Errors.new(self)
  end

  def perform!
    validate!
    perform_phase_errors.clear
    ActiveRecord::Base.transaction { do_perform }
  end

  # Simply calling `errors.add` during perform wont invalidate the action.
  # This is rather unelegant workaround.
  # TODO: find a nicer solution, probably use an existing business action or service gem.
  def failed_perform?
    !perform_phase_errors.empty?
  end

  private

  def do_perform
    raise NotImplementedError
  end
end
