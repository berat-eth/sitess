// Dashboard utility functions and data

export function getProjectStatusLabel(status: string): string {
  const statusMap: { [key: string]: string } = {
    'draft': 'Taslak',
    'in_progress': 'Devam Ediyor',
    'review': 'İncelemede',
    'completed': 'Tamamlandı',
    'cancelled': 'İptal Edildi'
  };
  return statusMap[status] || status;
}

export function getProjectStatusColor(status: string): string {
  const colorMap: { [key: string]: string } = {
    'draft': 'gray',
    'in_progress': 'blue',
    'review': 'yellow',
    'completed': 'green',
    'cancelled': 'red'
  };
  return colorMap[status] || 'gray';
}

export function getReportStatusLabel(status: string): string {
  const statusMap: { [key: string]: string } = {
    'pending': 'Bekliyor',
    'generating': 'Oluşturuluyor',
    'ready': 'Hazır',
    'delivered': 'Teslim Edildi'
  };
  return statusMap[status] || status;
}

export function getReportStatusColor(status: string): string {
  const colorMap: { [key: string]: string } = {
    'pending': 'gray',
    'generating': 'blue',
    'ready': 'green',
    'delivered': 'blue'
  };
  return colorMap[status] || 'gray';
}

