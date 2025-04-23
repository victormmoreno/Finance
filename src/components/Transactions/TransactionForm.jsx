import { Label, TextInput, HelperText, Select, Button } from 'flowbite-react';

const TransactionForm = ({
  description,
  setDescription,
  amount,
  setAmount,
  date,
  setDate,
  category,
  setCategory,
  categories,
  errors,
  handleSubmit,
  onClose,
  validateField,
  isFormValid
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description">Descripción</Label>
        </div>
        <TextInput
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={(e) => validateField('description', e.target.value)}
          required
          color={errors.description ? 'failure' : 'success'}
        />
        {errors.description ? (
          <HelperText color="failure">{errors.description}</HelperText>
        ) : (
          <HelperText>Descripción de la transacción</HelperText>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="amount">Monto</Label>
        </div>
        <TextInput
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={(e) => validateField('amount', e.target.value)}
          required
          color={errors.amount ? 'failure' : 'success'}
        />
        {errors.amount ? (
          <HelperText color="failure">{errors.amount}</HelperText>
        ) : (
          <HelperText>Costo de la transacción</HelperText>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="date">Fecha</Label>
        </div>
        <TextInput
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={(e) => validateField('date', e.target.value)}
          required
          color={errors.date ? 'failure' : 'success'}
        />
        {errors.date ? (
          <HelperText color="failure">{errors.date}</HelperText>
        ) : (
          <HelperText>Fecha de la transacción</HelperText>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="category">Categoría</Label>
        </div>
        <Select 
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          onBlur={(e) => validateField('category', e.target.value)}
          value={category}
          color={errors.category ? 'failure' : 'success'}
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
        {errors.category && (
          <HelperText color="failure">{errors.category}</HelperText>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="cursor-pointer px-4 py-2 border rounded">
          Cancelar
        </button>
        <Button 
          type="submit" 
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={!isFormValid()}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
