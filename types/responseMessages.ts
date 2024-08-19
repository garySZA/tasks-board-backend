export enum ResponseMessage {
    BAD_REQUEST = 'No se han proporcionado los parámetros necesarios',
    CONFLICT = 'Ya existe un recurso con el mismo nombre',
    CREATED = 'Recurso creado correctamente',
    DELETED = 'Recurso eliminado correctamente',
    ERROR = 'Ha ocurrido un error',
    EXPIRED_TOKEN = 'Token expirado',
    FIELD_EXIST = 'El campo ya se encuentra registrado',
    FIELD_IS_REQUIRED = 'El campo es obligatorio',
    FORBIDDEN = 'Acceso denegado. No tienes los permisos necesarios para realizar esta acción',
    INTERNAL_SERVER_ERROR = 'Error interno del servidor. Contacte con el administrador.',
    IS_USER_ASSIGNED_TO_TASK = 'El usuario ya se encuentra asignado a la tarea',
    MIN_LENGTH = 'El campo debe tener mínimo ',
    NOT_FOUND = 'Recurso no encontrado',
    NUMBER_IN_RANGE = 'Debe ser un número entre ',
    OK = 'Operación realizada con éxito',
    RESOURCE_IS_DELETED = 'El recurso fue eliminado',
    SERVICE_UNAVAILABLE = 'Servicio no disponible. Por favor, intenta de nuevo más tarde.',
    UNAUTHORIZED = 'No autorizado. Por favor, inicia sesión.',
    UPDATED = 'Recurso actualizado correctamente',
    VALID_NUMBER = 'Debe ser un número válido',
    VALIDATION_ERROR = 'Los datos proporcionados no son válidos',
}