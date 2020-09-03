class CreatePayments < ActiveRecord::Migration[6.0]
  def change
    enable_extension :plpgsql

    # I like to keep as much validations on the DB layer as possible.
    create_enum :payment_status, %i[
      unknown
      requires_payment_method
      requires_confirmation
      requires_action
      processing
      requires_capture
      canceled
      succeeded
    ]

    create_table :payments do |t|
      t.string :stripe_id, null: false, unique: true
      t.string :status, as: :payment_status, null: false, default: :unknown
      t.integer :amount_cents, null: false

      t.timestamps
    end
  end
end
